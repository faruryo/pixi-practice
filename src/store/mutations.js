export const state = {
    message: 'hello vuex',
    draggedItem: null,

    schedule: [],
};

export const mutations = {
    draggedItem(state, payload) {
        state.draggedItem = payload.item;
    },

    schedule(state, payload) {
        state.schedule = payload.item;
    },
  };

export const actions = {
    saveDraggedItem({commit}, item){
        commit('draggedItem',{item})
    },

    setScheduleItem({commit}, item){
        commit('schedule',{item})
    },
};