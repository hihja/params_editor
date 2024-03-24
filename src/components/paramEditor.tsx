import React, { Component } from 'react';

// Типы данных для параметров и модели
interface Param {
    id: number;
    name: string;
    type: 'string' | 'number' | 'select'; // Добавляем поддержку новых типов
    options?: string[]; // Опции для типа 'select'
}

interface ParamValue {
    paramId: number;
    value: string | number; // Обновляем тип значения параметра
}

interface Model {
    paramValues: ParamValue[];
}

interface Props {
    params: Param[];
    model: Model;
}

interface State {
    paramValues: Map<number, string | number>; // Обновляем тип значения параметра
}

class ParamEditor extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        // Инициализируем значения параметров
        const paramValues = new Map<number, string | number>();
        props.params.forEach(param => {
            const value = props.model.paramValues.find(pv => pv.paramId === param.id)?.value || '';
            paramValues.set(param.id, value);
        });

        this.state = { paramValues };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.getModel = this.getModel.bind(this);
    }

    // Обработчик изменения значения параметра
    handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, paramId: number) {
        const { value } = event.target;
        this.setState(prevState => ({
            paramValues: new Map(prevState.paramValues).set(paramId, value)
        }));
    }

    // Получение модели с проставленными значениями параметров
    getModel(): Model {
        const { paramValues } = this.state;
        const model: Model = {
            paramValues: []
        };

        paramValues.forEach((value, paramId) => {
            model.paramValues.push({ paramId, value });
        });

        return model;
    }

    render() {
        const { params } = this.props;
        const { paramValues } = this.state;

        return (
            <div>
                {params.map(param => (
                    <div key={param.id}>
                        <label>{param.name}: </label>
                        {param.type === 'select' ? ( // Проверяем тип параметра
                            <select
                                value={paramValues.get(param.id)}
                                onChange={(event) => this.handleInputChange(event, param.id)}
                            >
                                {param.options?.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type={param.type === 'number' ? 'number' : 'text'} // Используем тип ввода в зависимости от типа параметра
                                value={paramValues.get(param.id)}
                                onChange={(event) => this.handleInputChange(event, param.id)}
                            />
                        )}
                    </div>
                ))}
            </div>
        );
    }
}

export default ParamEditor;
