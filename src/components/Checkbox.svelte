<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

<script>
    export let checkboxContent, status; 
</script>

<div>
  <input type="checkbox" bind:checked={status} id="customCheckbox"/>
  <label  for="customCheckbox">{checkboxContent}</label>
</div>

<style>
    input[type=checkbox] {
        display: none;
    }

    label {
        display: inline-block;
        cursor: pointer;
        padding-left: 35px;
        position:relative;

        color: #262626;
        font-weight: 400;
        font-size: 20px;
    }

    input[type=checkbox] + label:after {
        font-family: 'Material Icons';
        content: "";
        display: inline-block;
        width: 20px;
        height: 20px;
        position: absolute;
        left: 0;
        border: 2px solid #262626;
        border-radius: 4px;
    }

    input[type=checkbox]:checked + label:after {
        content: "\E5CA";
        color: #fff;
        font-size: 20px;
        text-align: center;
        line-height: 20px;
        background: #E22C38;
        border-color: #E22C38;
    }
</style>