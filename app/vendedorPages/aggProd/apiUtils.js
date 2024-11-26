import axios from 'axios';

export const fetchProductsBySeller = async (token, idSeller) => {
  try {
    const response = await axios.post(
      'https://backend-j959.onrender.com/api/Product/GetProductsByIdSeller',
      idSeller,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false, error: 'Error al obtener los productos.' };
    }
  } catch (error) {
    return { success: false, error: 'Ocurrió un error al obtener los productos.' };
  }
};
