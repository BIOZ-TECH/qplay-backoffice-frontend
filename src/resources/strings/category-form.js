/* App bar */
const BREADCRUMB = {
    CATEGORIES:     {
        name: 'Categorías',
        route: '/',
    },
    EDIT_CATEGORY: {
        name: 'Editar categoría',  
    },
    NEW_CATEGORY: {
        name: 'Nueva categoría',  
    },
}
const CATEGORY = 'Categoría';
const SAVE = 'Guardar';
const SAVE_CHANGES = 'Guardar cambios';

/* View texts */
const OF_CATEGORY = 'de la categoría';
const FORM = {
    CATEGORY_NAME: 'Nombre de la categoría',
    CATEGORY_POSITION: 'Orden en la lista de categoría',
    OPTIONAL_DESCRIPTION: 'Descripción (opcional)',
};
const CREATE_SUCCESS = {
    severity: 'success',
    text: 'La categoría ha sido creada correctamente'
};
const UPDATE_SUCCESS = {
    severity: 'success',
    text: 'La categoría ha sido actualizado correctamente',
};


const CATEGORY_FORM_STRINGS = {
    BREADCRUMB,
    CATEGORY,
    SAVE,
    SAVE_CHANGES,
    OF_CATEGORY,
    FORM,
    CREATE_SUCCESS,
    UPDATE_SUCCESS,
};

export default CATEGORY_FORM_STRINGS;