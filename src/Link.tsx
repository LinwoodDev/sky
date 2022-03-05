import { MantineColor, Anchor as MantineLink, AnchorProps } from '@mantine/core';
import NextLink from 'next/link';


import React, { PropsWithChildren } from 'react'

interface Props extends AnchorProps<'a'> {
    href: string;
}

export default function Link(props: PropsWithChildren<Props>) {
    return (
        <NextLink href={props.href} passHref>
            <MantineLink {...props}>
                {props.children}
            </MantineLink>
        </NextLink>
    )
}