import { ComponentPropsWithRef, ForwardedRef, forwardRef } from 'react';
import './Label.scss';

interface LabelProps extends ComponentPropsWithRef<'label'> {}

const Label = forwardRef((props: LabelProps, ref: ForwardedRef<HTMLLabelElement>) => {
    const { children, className, ...rest } = props;

    return (
        <label {...rest} ref={ref} className={['rcl-form-label', className].join(' ')}>
            {children}
        </label>
    );
});

export default Label;
