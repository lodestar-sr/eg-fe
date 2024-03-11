import { useFormContext, Controller } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

type Props = Omit<TextFieldProps, 'onChange'> & {
  name: string;
  onChange?: (field: string, value: string) => void;
};

export const RHFTextField = ({
  name,
  helperText,
  onChange,
  ...other
}: Props) => {
  const { control, trigger } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          value={
            typeof field.value === 'number' && field.value === 0
              ? ''
              : field.value
          }
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
          onBlur={() => {
            field.onBlur();
            trigger(name);
          }}
          onChange={(e) => {
            field.onChange(e);
            trigger(name);
            if (onChange) {
              onChange(name, e.target.value);
            }
          }}
        />
      )}
    />
  );
};
