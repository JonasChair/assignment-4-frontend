import { displayContent } from "./src/sharedFuctions.js";
import { buildForm } from "./src/formControl.js";
const inputs = [
    {
        id: `car-title`,
        placeholder: `Input car title (min 3 characters)`,
        type: `text`
    },
    {
        id: `car-price`,
        placeholder: `Input car price`,
        type: `number`
    },
    {
        id: `car-image`,
        placeholder: `Car image url`,
        type: `text`
    },
    {
        id: `car-number-plates`,
        placeholder: `Number plates`,
        type: `text`
    }
]

displayContent(buildForm(inputs), `main`);