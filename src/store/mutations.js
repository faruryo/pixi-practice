export const state = {
    message: 'hello vuex',
    draggedItem: null,
};

export const mutations = {
    draggedItem(state, payload) {
      state.draggedItem = payload.item;
    },
  };

export const actions = {
    saveDraggedItem({commit}, item){
        commit('draggedItem',{item})
    },
};