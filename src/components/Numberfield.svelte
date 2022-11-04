<script>
    export let labelContent, inputContent;
    let inputElement = null;
</script>

<div class="field">
    <input
        bind:this={inputElement}
        bind:value={inputContent}
        type="number"
        min="1"
        max="120"
        required
    />
    <label>{labelContent}</label>
</div>

<style>
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type="number"] {
        -moz-appearance: textfield;
    }

    input[type="number"]:hover,
    input[type="number"]:focus {
        -moz-appearance: number-input;
    }
</style>