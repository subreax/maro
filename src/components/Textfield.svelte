<script>
     export let labelContent, inputContent, type;
     let inputElement = null;

     function typeAction(node) {
         node.type = type;
     }
</script>

<div class="field">
    <input bind:this={inputElement} bind:value={inputContent} use:typeAction required>
    <label>{labelContent}</label>
</div>
