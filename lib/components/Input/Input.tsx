import { VariantProps, cva } from 'class-variance-authority';
import { ComponentPropsWithRef, ForwardedRef, forwardRef } from 'react';
import './Input.scss';

const inputVariants = cva(['rcl-form-input'], {
    variants: {
        invalid: {
            true: ['invalid'],
            false: [],
        },
        valid: {
            true: ['valid'],
            false: [],
        },
        disabled: {
            true: ['disabled'],
            false: [],
        },
    },
    defaultVariants: {
        disabled: false,
        invalid: false,
        valid: false,
    },
});

interface InputProps extends Omit<ComponentPropsWithRef<'input'>, 'disabled'>, VariantProps<typeof inputVariants> {}

const Input = forwardRef((props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { invalid, valid, disabled, className, ...rest } = props;

    return (
        <input
            {...rest}
            ref={ref}
            disabled={disabled ? disabled : undefined}
            className={inputVariants({ invalid, valid, disabled, className })}
        />
    );
});

export default Input;
