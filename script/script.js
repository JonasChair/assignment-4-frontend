import { buildContent, API_URL , log, buildMessageWrapper} from "./src/sharedFuctions.js";

const deleteCar = async (car,event) => {
    const response = await fetch(`${API_URL}/cars/${car.id}`, {
        method: `DELETE`
    })
    const deletedCar = await response.json();
    if (deletedCar.status === true) {
        event.target.innerText = 'Car was deleted, updating in 2 seconds';
        event.target.style = 'color: green';
        setTimeout(()=>{
            document.getElementById('main').innerHTML = '';
            buildContent(`${API_URL}/cars`, buildCarsWrapper, 'main');
        },2000)
    } else {
        event.target.innerText = 'Could not delete the car';
    }
}

const buildCarWrapper = (car) => {
    const carWrapper = document.createElement(`div`);
    carWrapper.classList.add(`car-wrapper`);

    const plateNumber = document.createElement(`h3`);
    plateNumber.innerText = car.number_plates;

    const carName = document.createElement(`h4`);
    carName.innerText = car.title;

    const carImage = document.createElement(`img`);
    carImage.src = car.immage;

    const carPrice = document.createElement(`div`);
    carPrice.innerText = `${car.price}€`;

    const carTextWrapper = document.createElement(`div`);
    carTextWrapper.classList.add(`car-text-wrapper`);
    const carImgWrapper = document.createElement(`div`);
    carImgWrapper.classList.add(`car-img-wrapper`);

    const deleteButton = document.createElement(`button`);
    deleteButton.classList.add(`delete-button`);
    deleteButton.innerText = `Delete this car`;
    deleteButton.addEventListener(`click`, (event) => deleteCar(car,event))

    carTextWrapper.append(plateNumber, carName, carPrice);
    carImgWrapper.append(carImage);
    carWrapper.append(carTextWrapper);
    carWrapper.append(carImgWrapper);
    carWrapper.append(deleteButton);

    return carWrapper;
}

const buildCarsWrapper = (data) => {
    const carsWrapper = document.createElement(`div`);
    carsWrapper.classList.add(`cars-wrapper`);
    data.cars
        .sort((a, b) => a.price - b.price)
        .forEach((car) => {
            const carWrapper = buildCarWrapper(car);
            carsWrapper.append(carWrapper);
        });

    return carsWrapper;
}

buildContent(`${API_URL}/cars`, buildCarsWrapper, 'main');