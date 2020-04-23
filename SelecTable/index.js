import React, { useRef, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import table from 'react-table'
import selectTable from 'react-table/lib/hoc/selectTable'
// components
import FilterComponent from '../../components/InputSearch/TH'
// context
import Context from './Context'
// hooks
import useFetchData from '../../hooks/useFetchDataTable'
import useSelectTable from '../../hooks/useSelectTable'
// helpers
import get from 'lodash/get'
import size from 'lodash/size'

const Table = selectTable(table)
const pageSizeOptions = [20, 50, 100, 200]

const SelecTable = props => {
  const { colDefinition, gqlData, colSetting, paths, table } = props

  const ref = useRef(null)
  const columns = useMemo(() => colSetting(colDefinition), [colDefinition])

  const getTableInstance = useCallback(
    path =>
      path
        ? get(ref.current, `wrappedInstance.${path}`)
        : get(ref.current, ['wrappedInstance'], {}),
    [ref]
  )

  const { data: source, loading, onFetchData, refetch } = useFetchData(gqlData)
  const data = get(source, paths.data, [])
  const total = get(source, paths.total, size(data))

  const pages = total
    ? Math.ceil(total / getTableInstance('state.pageSize'))
    : 0

  const [selectable, selection] = useSelectTable('id', getTableInstance)

  const propsTable = {
    ref,
    data,
    pages,
    loading,
    columns,
    onFetchData,
    ...selectable,
    FilterComponent,
    pageSizeOptions,
    manual: true,
    minRows: pageSizeOptions[0],
    className: '-striped bg-white',
    noDataText: 'There is no data to display',
    showPageJump: false,
    showPagination: true,
    defaultPageSize: pageSizeOptions[0],
    ...table
  }

  const contextValue = {
    total,
    refetch,
    selection,
    getTableInstance
  }

  return (
    <Context.Provider value={contextValue}>
      <Table {...propsTable} />
    </Context.Provider>
  )
}

SelecTable.propTypes = {
  deps: PropTypes.array,
  paths: PropTypes.object,
  gqlData: PropTypes.object,
  colSetting: PropTypes.func
}

SelecTable.defaultProps = {
  deps: [],
  colSetting: c => c
}

export default SelecTable
