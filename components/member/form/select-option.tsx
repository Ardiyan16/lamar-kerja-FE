import { customStyles } from '@/utils/global';
import { OptionType } from '@/utils/option';
import { FC } from 'react';
import Select, { SingleValue } from 'react-select';

interface selectFormProps {
    label: string,
    mandatory: boolean,
    option: OptionType[],
    value: SingleValue<OptionType>,
    onChange: (e: any) => void,
    placholder: string,
}

export const SelectSingle: FC<selectFormProps> = ({
    label, mandatory,  option, value, onChange, placholder
}) => {

    return (
        <div>
            <label className="block text-sm font-medium mb-2">{label} {mandatory && <span className="text-red-600">*</span>}</label>
            <Select
                styles={customStyles}
                options={option}
                value={value}
                onChange={onChange}
                className="basic-single"
                placeholder={placholder}
            />
        </div>
    )

}

