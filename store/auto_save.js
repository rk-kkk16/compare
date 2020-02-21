/** auto_save:ON|OFF の状態保持 **/
export const state = () => ({
    setting:'OFF'
});

export const mutations = {
    dip(state) {
        if (state.setting == 'ON') {
            state.setting = 'OFF';
        } else {
            state.setting = 'ON';
        }
    }
};

