<script>
    export let userGoal = "";
  
    $: console.log(userGoal);
  </script>
  
<input type="text" bind:value={userGoal} />