import * as React from 'react';
export type FileUploadProps = Omit<React.ComponentPropsWithRef<'input'>, 'type' | 'value' | 'onChange'> & {
    label?: string;
    description?: string;
    error?: string;
    onFilesChange?: (files: File[]) => void;
};
declare function FileUpload({ className, label, description, error, multiple, disabled, onFilesChange, ref, id, ...props }: FileUploadProps): import("react/jsx-runtime").JSX.Element;
export { FileUpload };
