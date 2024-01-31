import {useState} from 'react';
import './app.css';
import axios from 'axios';
import FormInput from './components/FormInput';

const App = () => {

  const [values, setValues] = useState({
    supplier_name: '',
    region: '',
    country_name: '',
    strategic_region: '',
    level_one: '',
    business_unit: '',
    legal_entity: '',
    cost_center_base: '',
    cost_center_four: '',
    cost_center_five: '',
    gl_four: '',
    gl_five: '',
    invoice_source: '',
    gl_description: '',
    amount_usd: ''
  });

  const inputs = [
    {
      id: 1,
      name: "supplier_name",
      type: "text",
      placeholder: "Supplier Name",
      label: "Supplier Name"
    },
    {
      id: 2,
      name: "region",
      type: "text",
      placeholder: "Region",
      label: "Region"
    },
    {
      id: 3,
      name: "country_name",
      type: "text",
      placeholder: "Country Name",
      label: "Country Name"
    },
    {
      id: 4,
      name: "strategic_region",
      type: "text",
      placeholder: "Strategic Region",
      label: "Strategic Region"
    },
    {
      id: 5,
      name: "level_one",
      type: "text",
      placeholder: "Level One",
      label: "Level One"
    },
    {
      id: 6,
      name: "business_unit",
      type: "text",
      placeholder: "Bussiness Unit",
      label: "Bussiness Unit"
    },
    {
      id: 7,
      name: "legal_entity",
      type: "text",
      placeholder: "Legal Entity",
      label: "Legal Entity"
    },
    {
      id: 8,
      name: "cost_center_base",
      type: "text",
      placeholder: "Cost Center Base",
      label: "Cost Center Base"
    },
    {
      id: 9,
      name: "cost_center_four",
      type: "text",
      placeholder: "Cost Center Four",
      label: "Cost Center Four"
    },
    {
      id: 10,
      name: "cost_center_five",
      type: "text",
      placeholder: "Cost Center Five",
      label: "Cost Center Five"
    },
    {
      id: 11,
      name: "gl_four",
      type: "text",
      placeholder: "GL Four",
      label: "GL Four"
    },
    {
      id: 12,
      name: "gl_five",
      type: "text",
      placeholder: "GL Five",
      label: "GL Five"
    },
    {
      id: 13,
      name: "invoice_source",
      type: "text",
      placeholder: "Invoice Source",
      label: "Invoice Source"
    },
    {
      id: 14,
      name: "gl_description",
      type: "text",
      placeholder: "GL Description",
      label: "GL Description"
    },
    {
      id: 15,
      name: "amount_usd",
      type: "text",
      placeholder: "Amount USD",
      label: "Amount USD"
    }                                        
  ]

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/purchase', values)
      .then(response => {
        // Se necessário, processar a resposta do backend
        console.log('Resposta do backend:', response.data);
      })
      .catch(error => {
        console.error('Erro ao enviar dados para o backend:', error);
      });
  };

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  console.log(values);

  return <div className="app">
    <form onSubmit={handleSubmit}>
      <h1> Taxonomy</h1>
      {inputs.map(input => (
        <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
      ))}
      <button>Submit</button>

    </form>
  </div>;
};

export default App;
