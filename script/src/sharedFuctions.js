export const API_URL = `http://localhost:3000`

export const log = (logs) => console.log(logs);

export const getData = async (endPoint) => {
    try {
        const response = await fetch(endPoint);
        const data = await response.json();
        return data;
    } catch (err) {
        return false;
    }
}

export const buildContentWrapper = (data, builder) => {
    if(data){
        if (data.cars.length > 0) {
            return builder(data);
        } else if (!data.cars.length) {
            return buildMessageWrapper(`No cars to display!`, `success`);
        }
    }
    return buildMessageWrapper(`Something went wrong while getting the data, please try again.`, `error`);
}

export const buildMessageWrapper = (message, status) => {
    const messageWrapper = document.createElement(`div`);
    messageWrapper.classList.add(`message`);
    messageWrapper.innerText = message;
    switch (status) {
        case (`error`):
            messageWrapper.classList.add(`error`);
            break;
        default:
            messageWrapper.classList.add(`success`);
    }
    return messageWrapper;
}

export const displayContent = (content, wrapperId) => {
    const wrapper = document.getElementById(wrapperId);
    wrapper.append(content);
}

export const buildContent = async (dataEndpoint, builder, wrapperId) => {
    const data = await getData(dataEndpoint);
    const content = buildContentWrapper(data, builder);
    displayContent(content, wrapperId);
}