import React, {useEffect, useState} from 'react';


interface IProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    onChange(value: boolean, sendRequest: void): void;

}

interface IConfiguration {
    id: number,
    name: string,
    activateConfiguration: boolean
}

export const CheckboxList: React.FunctionComponent<IProps> = ({   children,
                                                                   onChange, ...shared}) => {
    const [conf, setConfigs] = useState<IConfiguration[]>();

    let configuration = {
        configurationName: 'showTime',
        activate: 'false'
    }

    async function submit(e:any,text:string) {
        console.log(text);
        let setConfigurations = await fetch("http://localhost:9000/api/conf/activate", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(configuration)
        });

        let result = await setConfigurations.json();
        console.log(result);
    }

    const getConf = async () => {
        let response = await fetch("http://localhost:9000/api/conf/configurations");
        let conf = await response.json();
        setConfigs(conf)
    }

    useEffect(() => {
        getConf()
    }, [])

    return (
        <div>
            <span>MedimaNet configurations (example):</span>
            <div>
                {conf?.map((con) => <div>
                    <label>
                    <input onChange={async e => onChange(true, await submit(e,con.name))} value={"con.name"}{...shared} />
                        {con.name}
                    </label>
                </div>)}
            </div>
        </div>
    )
}

CheckboxList.defaultProps = {
    type: 'checkbox',
}

