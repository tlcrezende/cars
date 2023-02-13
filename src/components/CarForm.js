import { useDispatch, useSelector } from 'react-redux';
import { changeName, changeCost, addCar } from '../store';

function CarForm() {
  const dispatch = useDispatch();

  // useSelector é a função que faz essa parte do código ter acesso aos estados do reducer. Assim, conseguimos acessar o state do slice form e objeto name.
  const { name, cost } = useSelector((state) => {
    return {
      name: state.form.name,
      cost: state.form.cost,
    };
  });

  // função responsável por mudar o valor do formulário quando o usuário digita, isto é, muda o state do nome cars a cada "teclada"
  // dispath é a forma que o reducer faz para chamar a função changeName que muda o nome do carro
  const handleNameChange = (event) => {
    dispatch(changeName(event.target.value));
  };

  //parseInt previni que apenas numeros possam ser escritos, ou um 0
  const handleCostChange = (event) => {
    const carCost = parseInt(event.target.value) || 0;
    dispatch(changeCost(carCost));
  };
  const handleSubmit = (event) => {
    // tira o padrão normal do navegador de querer dar refresh na página toda vez que tem a entrada de um submit
    event.preventDefault();
    // chama a função de adicionar caro, ou melhor, enviar name e cost para a função do reducer
    dispatch(addCar({ name, cost }));
  };

  return (
    <div className="car-form panel">
      <h4 className="subtitle is-3">Add Car</h4>
      <form onSubmit={handleSubmit}>
        <div className="field-group">
          <div className="field">
            <label className="label">Name</label>
            <input
              className="input is-expanded"
              value={name}
              onChange={handleNameChange}
            />
          </div>

          <div className="field">
            <label className="label">Cost</label>
            <input
              className="input is-expanded"
              // empty string é para "tirar" o 0 que fica lá insistente no formulário
              value={cost || ''}
              onChange={handleCostChange}
              type="number"
            />
          </div>
        </div>
        <div className="field">
          <button className="button is-link">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default CarForm;
