<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

<script>
    export let checkboxContent;
    export let status;
    export let style = "";
    export let className = "";
</script>

<div class={className} {style}>
  <input type="checkbox" bind:checked={status} id="customCheckbox"/>
  <label  for="customCheckbox">{checkboxContent}</label>
</div>

<style>
    input[type=checkbox] {
        display: none;
    }

    label {
        cursor: pointer;
        padding-left: 1.9rem;
        position:relative;

        color: #262626;
        font-weight: 400;
        font-size: 1rem;
    }

    input[type=checkbox] + label:after {
        font-family: 'Material Icons';
        content: "";
        display: inline-block;
        width: 1rem;
        height: 1rem;
        position: absolute;
        left: 0;
        border: 2px solid #262626;
        border-radius: 4px;
    }

    input[type=checkbox]:checked + label:after {
        content: "\E5CA";
        color: #fff;
        font-size: 1rem;
        text-align: center;
        line-height: 1rem;
        background: #E22C38;
        border-color: #E22C38;
    }
</style>