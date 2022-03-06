import { createStyles, MantineColor, ThemeIcon, UnstyledButton, Text, Group } from '@mantine/core'
import Link from 'next/link';
import React from 'react'

type Props = {
    color?: MantineColor;
    icon: React.ReactNode;
    label: React.ReactNode;
    href?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    selected?: boolean;
    description?: React.ReactNode;
}

const useStyles = createStyles((theme) => ({
    button: {
        display: 'block',
        width: '100%',
        padding: theme.spacing.sm,
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
export default function ListButton({ color, icon, label, href, onClick, selected, description }: Props) {
    const { classes, cx } = useStyles();
    const component = (
        <UnstyledButton className={selected ? cx(classes.button, classes.selected) : classes.button} onClick={onClick}>
            <Group>
                <ThemeIcon color={color} variant="light">
                    {icon}
                </ThemeIcon>
                <Group direction='column' spacing={1}>
                    <Text size="md">
                        {label}
                    </Text>
                    {description &&
                        <Text size="sm" color="gray.5">
                            {description}
                        </Text>
                    }
                </Group>
            </Group>
        </UnstyledButton>
    )
    if (href) {
        return (
            <Link href={href}>
                {component}
            </Link>
        )
    }
    return component;
}