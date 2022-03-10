import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

interface LinkCheckProps {
    select?: any,
    reducer3?: any
}

const LinkCheck = ({ select, reducer3, children }: PropsWithChildren<LinkCheckProps>) => {
    if (select.type === 'search') {
        return (
            <Link href={`/search/?source=${select.source}&type=${select.type}&keyword=${reducer3.keyword?.replace(/ /g, '+')}`}>
                {children}
            </Link>
        );
    }

    return (
        <Link href={`/?source=${select.source}&type=${select.type}`}>
            {children}
        </Link>
    );
};

export default LinkCheck;