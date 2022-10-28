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
  padding-left: 25px;
  position:relative;
}

input[type=checkbox] + label:after {
    font-family: 'Material Icons';
    content: "";
    display: inline-block;
    width: 16px;
    height: 16px;
    position: absolute;
    left: 0;
    border: 2px solid #757575;
    border-radius: 2px;
}

input[type=checkbox]:checked + label:after {
    content: "\E5CA";
    color: #fff;
    font-size: 16px;
    text-align: center;
    line-height: 16px;
    background: #E22C38;
    border-color: #E22C38;
}
</style>