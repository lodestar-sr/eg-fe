import { ReactNode } from 'react';
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

type Props = {
  className?: string;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  children: ReactNode;
};

export const FormProvider = ({
  className,
  methods,
  children,
  onSubmit,
  ...otherProps
}: Props) => (
  <Form {...methods}>
    <form className={className} onSubmit={onSubmit} {...otherProps}>
      {children}
    </form>
  </Form>
);
