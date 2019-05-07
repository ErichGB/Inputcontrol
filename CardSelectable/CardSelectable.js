import React from 'react';
import classes from 'classnames/bind';
import PropTypes from 'prop-types';
// antd components
import Icon from 'antd/lib/icon';
import Card from 'antd/lib/card';
// helpers
import omit from 'lodash/omit';
import isEmpty from 'lodash/isEmpty';
// styles
import styles from './styles.module.scss';

class CardSelectable extends React.Component {
    static propTypes = {
        disabled: PropTypes.bool,
        checked: PropTypes.bool,
        prefix: PropTypes.node,
        suffix: PropTypes.node,
        value: PropTypes.any,
        meta: PropTypes.object
    };

    static defaultProps = {
        disabled: false,
        checked: false,
        meta: {}
    };

    static contextTypes = {
        radioGroup: PropTypes.any,
        checkboxGroup: PropTypes.any,
    };

    cx = classes.bind(styles);
    
    onChange = () => {
        const { value, onChange, disabled } = this.props;
        const { radioGroup, checkboxGroup } = this.context;

        if(disabled) return;

        if (radioGroup && radioGroup.onChange)
            radioGroup.onChange(value);

        if (checkboxGroup && checkboxGroup.toggleOption)
            checkboxGroup.toggleOption(value);

        if(onChange) onChange(value);
    };

    render() {
        const { checked: selected, disabled, className, children, meta, prefix, suffix, ...attr } = this.props;

        const propsCard = {
            ...omit(attr, ['value']),
            onClick: this.onChange,
            hoverable: !selected,
            className: this.cx({ selected }, { disabled }, styles.card, className)
        };

        const CheckIcon = () => (
            <div className={styles.check}>
                <Icon type='check-circle'/>
            </div>
        );

        return (
            <div className='p-4'>
                { prefix && <div className='text-muted py-2'>{prefix}</div> }
                <Card {...propsCard}>
                    { selected && <CheckIcon/> }
                    { !isEmpty(meta) && <Card.Meta {...meta}/> }
                    { children }
                </Card>
                { suffix && <div className='text-muted py-2'>{suffix}</div> }
            </div>
        );
    }
}

export default CardSelectable;