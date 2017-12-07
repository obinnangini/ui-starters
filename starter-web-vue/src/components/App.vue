<template>
  <div>
    {{foo}}
    <button class="btn btn-secondary" @click="handleClick">Click count: {{clickCount}}</button>
  </div>
</template>
<script>
  export default {
    data() {
      return {foo: 'bar', clickCount: 0};
    },
    mounted() {
      this.getHello().then(val => {
        if (val) {
          this.foo = val;
        }
      });
    },
    methods: {
      handleClick(e) {
        e.preventDefault();
        this.clickCount++;
      },
      getHello: async () => {
        const res = await fetch('/api/hello');
        if (res.ok) {
          return res.text();
        }
        return undefined;
      },
    },
  };
</script>
