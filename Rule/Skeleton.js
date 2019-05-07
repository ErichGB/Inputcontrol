import React from 'react';
// antd component
import Card from 'antd/lib/card';
import Skeleton from 'antd/lib/skeleton';
// styles
import styles from './styles.module.scss';

const SkeletonRule = () => {
    const propsSkeleton = (width) => ({
        active: true,
        title: false,
        paragraph: {
            rows: 1,
            width
        }
    });

    const propsCard = {
        type: 'inner',
        title: <Skeleton {...propsSkeleton(150)} />,
        extra: <Skeleton {...propsSkeleton(75)} />,
        className: styles.RuleSkeleton
    };

    return (
        <Card {...propsCard}>
            <Skeleton {...propsSkeleton('100%')} />
        </Card>
    );
};

export default SkeletonRule;