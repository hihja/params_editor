import React, { Component } from 'react';
import ParamEditor from "./components/paramEditor";

interface Param {
    id: number;
    name: string;
    type: 'string' | 'select'; // Обновляем тип параметра
    options?: string[]; // Добавляем опции для типа 'select'
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Model {
    paramValues: ParamValue[];
}

class App extends Component {
    state: {
        params: Param[];
        model: Model;
    };

    constructor(props: {}) {
        super(props);

        // Пример данных параметров и модели
        this.state = {
            params: [
                { id: 1, name: 'Назначение', type: 'string' },
                { id: 2, name: 'Длина', type: 'string' },
                { id: 3, name: 'Тест', type: 'select', options: ['опция 1', 'опция 2', 'опция 3'] } // Передаем опции для типа 'select'
            ],
            model: {
                paramValues: [
                    { paramId: 1, value: 'повседневное' },
                    { paramId: 2, value: 'макси' },
                    { paramId: 3, value: 'опция 1' } // Устанавливаем значение для типа 'select'
                ]
            }
        };
    }

    render() {
        const { params, model } = this.state;

        return (
            <div className="App">
                <h1>Редактор параметров товара</h1>
                <ParamEditor params={params} model={model} />
            </div>
        );
    }
}

export default App;
