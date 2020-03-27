import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "#000000" }
};

const AddColor = ({updateColors}) => {
    const [newColor, setNewColor] = useState(initialColor);

    const clearForm = e => {
        setNewColor(initialColor);
    }

    const saveColor = e => {
        e.preventDefault();
        axiosWithAuth()
            .post(`/api/colors/`, newColor)
            .then(res => {
                updateColors();
                clearForm();
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <form onSubmit={saveColor}>
        <legend>Add Color</legend>
        <label>
          Color Name:
          <input
            onChange={e =>
              setNewColor({ ...newColor, color: e.target.value })
            }
            value={newColor.color}
          />
        </label>
        <label>
          Hex Code:
          <input
            onChange={e =>
              setNewColor({
                ...newColor,
                code: { hex: e.target.value }
              })
            }
            value={newColor.code.hex}
          />
        </label>
        <div className="button-row">
          <button type="submit">Add</button>
          <button onClick={() => clearForm}>Cancel</button>
        </div>
      </form>
    )
}

export default AddColor;