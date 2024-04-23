import { useState } from 'react';
import { Input, Checkbox, Radio, Select, Switch, Label } from '../lib';

const names = [
    'John Smith',
    'Jane Doe',
    'Olivia Jones (disabled)',
    'William Miller',
    'Emma Garcia',
    'Noah Hernandez',
    'Sophia Davis',
    'Liam Taylor',
    'Ava Johnson',
    'Benjamin Brown',
    'Charlotte Garcia',
    'Lucas Moore',
    'Mia Robinson',
    'Elijah Williams',
    'Evelyn Wilson (disabled)',
    'Alexander Thompson',
    'Isabella Garcia',
    'Matthew Lopez',
    'Amelia Hernandez',
];

function App() {
    const [val, setVal] = useState(34867);

    return (
        <div className="main">
            <h1>Hello</h1>

            <Input
                placeholder="Enter name"
                className="font-bold"
                // disabled
                // value="Lorem ipsum, dol!"
            />

            <br />
            <br />

            <Select
                options={[
                    {
                        label: 'Number 1',
                        value: '12345',
                    },
                    {
                        label: 'Number 2',
                        value: '34567',
                    },
                    {
                        label: 'Number 3',
                        value: '16345',
                        disabled: true,
                    },
                    {
                        label: 'Number 4',
                        value: '34867',
                    },
                ]}
                onChange={(e) => console.log(e.target.value)}
            />
            <br />
            <br />

            <Select
                menuProps={{
                    style: {
                        boxShadow: '1px 6px 32px 0px rgba(5, 22, 35, 0.06)',
                        border: '1px solid rgba(231, 232, 242, 1)',
                    },
                    offset: 4,
                    // closeOnScroll: true,
                }}
                menuItemProps={{
                    className: 'px-12',
                }}
                options={names.map((r) => ({ label: r, value: r }))}
                onChange={(e) => console.log(e.target.value)}
                showSearch
            />

            <br />
            <br />

            <Select
                options={[
                    {
                        label: 'Number 1',
                        value: 12345,
                    },
                    {
                        label: 'Number 2',
                        value: 34567,
                    },
                    {
                        label: 'Number 3',
                        value: 16345,
                        disabled: true,
                    },
                    {
                        label: 'Number 4',
                        value: 34867,
                    },
                ]}
                value={val}
                onChange={(e) => setVal(+e.target.value)}
            />
            <br />
            <br />

            <Select options={[]} />

            <br />
            <br />

            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter name" className="font-bold" />

            <br />
            <br />

            <div>
                <Checkbox />
                All checked
            </div>

            <div>
                <Checkbox checked />
                All checked
            </div>

            <div>
                <Checkbox />
                <Checkbox color="success" />
                <Checkbox color="warning" />
                <Checkbox color="error" />
                <Checkbox color="inherit" className="text-purple" />
            </div>

            <br />
            <br />

            <div>
                <Radio />
                All checked
            </div>

            <div>
                <Radio checked />
                All checked
            </div>

            <div>
                <Radio />
                <Radio color="success" />
                <Radio color="warning" />
                <Radio color="error" />
                <Radio color="inherit" className="text-purple" />
            </div>

            <div>
                <Checkbox className="text-xl" />

                <Radio className="text-xl" />
            </div>

            <div style={{ marginTop: '1rem' }}>
                <Switch />
            </div>

            <div style={{ marginTop: '1rem' }}>
                <Switch />
                <Switch color="success" />
                <Switch color="warning" />
                <Switch color="error" />
                <Switch color="inherit" className="text-purple" />
            </div>
        </div>
    );
}

export default App;
