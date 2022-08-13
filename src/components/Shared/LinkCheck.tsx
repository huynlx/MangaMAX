import { useAppSelector } from '@/hooks/useRedux';
import Link from 'next/link';
import React, { PropsWithChildren, ReactNode } from 'react';

interface LinkCheckProps {
    children?: ReactNode
}

const LinkCheck = ({ children }: PropsWithChildren<LinkCheckProps>) => {
    const { reducer: select, reducer3 } = useAppSelector((state) => state);

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