
import '@/style/quill.css'
import dynamic from 'next/dynamic';
import { FC } from 'react';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(
    () => {
        return import('react-quill-new');
    },
    { ssr: false }
);

interface textEditorProps {
    label: string,
    mandatory: boolean,
    value: string,
    onChange: (e: string) => void
}

const TextEditor: FC<textEditorProps> = ({ label, mandatory, value, onChange }) => {

    return (
        <div className="mt-5">
            <label className="block text-sm font-medium mb-2">{label} {mandatory && (<span className="text-red-600">*</span>)}</label>
            <ReactQuill
                theme="snow"
                className="min-h-[200px] bg-transparent"
                value={value}
                onChange={onChange}
                modules={{
                    toolbar: [["bold", "italic", "underline", "link",], [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],], // No background option
                }}
            />
        </div>
    )

}

export default TextEditor
