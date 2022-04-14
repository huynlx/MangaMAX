import Link from 'next/link';
import React, { PropsWithChildren, ReactNode } from 'react';

interface LinkCheckProps {
    select?: any,
    reducer3?: any,
    children?: ReactNode
}

const LinkCheck = ({ select, reducer3, children }: PropsWithChildren<LinkCheckProps>) => {
    if (select.type === 'search') {
        return (
            <Link as={`/search/${reducer3.keyword?.replace(/ /g, '+')}`} href={`/search/?source=${select.source}&type=${select.type}&keyword=${reducer3.keyword?.replace(/ /g, '+')}`}>
                {children}
            </Link>
        );
    }

    if (select.type === 'bookmarks') {
        return (
            <Link href={`/bookmarks`}>
                {children}
            </Link>
        );
    }

    if (select.type === 'recents') {
        return (
            <Link href={`/recents`}>
                {children}
            </Link>
        );
    }

    return (
        <Link as={`/`} href={`/?source=${select.source}&type=${select.type}`}>
            {children}
        </Link>
    );
};

export default LinkCheck;