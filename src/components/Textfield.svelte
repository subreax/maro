<script>
     export let labelContent, inputContent, type;

     function typeAction(node) {
         node.type = type;
     }
</script>

<div class="field">
    <input bind:value={inputContent} use:typeAction required>
    <label>{labelContent}</label>
</div>
