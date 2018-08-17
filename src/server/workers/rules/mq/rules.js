function Rules() {
  return {
    set: rules => {
      this.rules = rules;
    },
    get: () => this.rules,
  };
}

export default new Rules();
