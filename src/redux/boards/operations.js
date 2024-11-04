import axios from "axios";
import { addBoard, deleteBoard, setBoards, updateBoard } from "./slice.js";

const API_URL = 'https://672566a8c39fedae05b4ab3d.mockapi.io/boards';

export const fetchBoards = () => async dispatch => {
  try {
    const response = await axios.get(API_URL);
    dispatch(setBoards(response.data));
  } catch (error) {
    console.error("Failed fetchBoards:", error);
  }
};

export const createBoard = newBoard => async dispatch => {
  try {
    const response = await axios.post(API_URL, newBoard);
    dispatch(addBoard(response.data));
  } catch (error) {
    console.error("Faled newBoard:", error);
  }
};

export const editBoard = updatedBoard => async dispatch => {
  try {
    const response = await axios.put(`${API_URL}/${updatedBoard.id}`, updatedBoard);
    dispatch(updateBoard(response.data));
  } catch (error) {
    console.error("Failed updatedBoard:", error);
  }
};

export const removeBoard = boardId => async dispatch => {
  try {
    await axios.delete(`${API_URL}/${boardId}`);
    dispatch(deleteBoard(boardId));
  } catch (error) {
    console.error("removeBoard:", error);
  }
};
