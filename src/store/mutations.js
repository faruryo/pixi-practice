export const state = {
    message: 'hello vuex',
    draggedItem: null,

    schedule: [],
    isEventCtl: false,
    ctlingEvent: null,
};

export const mutations = {
    draggedItem(state, payload) {
        state.draggedItem = payload.item;
    },

    schedule(state, payload) {
        state.schedule = payload.item;
    },

    isEventCtl(state, payload) {
        state.isEventCtl = payload.item;
    },

    ctlingEvent(state, payload) {
        state.ctlingEvent = payload.item;
    },

  };

export const actions = {
    saveDraggedItem({commit}, item){
        commit('draggedItem',{item})
    },

    setScheduleItem({commit}, item){
        commit('schedule',{item})
    },

    setIsEventCtl({commit}, item){
        commit('isEventCtl',{item})
    },

    setCtlingEvent({commit}, item){
        commit('ctlingEvent',{item})
    },
};