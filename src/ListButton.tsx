import { createStyles, MantineColor, ThemeIcon, UnstyledButton, Text, Group } from '@mantine/core'
import Link from 'next/link';
import React from 'react'

type Props = {
    color: MantineColor;
    icon: React.ReactNode;
    label: string;
    href?: string;
    menu?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    selected?: boolean;
}

const useStyles = createStyles((theme) => ({
    button: {
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        },
    },
    selected: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }
}));
export default function ListButton({ color, icon, label, href, menu, onClick, selected }: Props) {
    const { classes, cx } = useStyles();
    const component = (
            <UnstyledButton className={selected ? cx(classes.button, classes.selected) : classes.button} onClick={onClick}>
                <Group>
                    <ThemeIcon color={color} variant="light">
                        {icon}
                    </ThemeIcon>
                    <Text size={menu ? "md" : "sm"}>
                        {label}
                    </Text>
                </Group>
            </UnstyledButton>
    )
    if(href) {
        return (
            <Link href={href}>
                {component}
            </Link>
        )
    }
    return component;
}