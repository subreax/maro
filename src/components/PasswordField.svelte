<script>
    export let labelContent, inputContent, idIcon, idPassword;

    let isPasswordHidden = true;
    let inputElement = null;

    function togglePassword() {
        isPasswordHidden = !isPasswordHidden;
        inputElement.setAttribute("type", isPasswordHidden ? "password" : "text");
    }
</script>


<div class="field">
   <input bind:this={inputElement} type="password" bind:value={inputContent}  required>
   <label>{labelContent}</label>

   <div class="input-icon" on:click={togglePassword}>
        <i  class="fa-solid" 
            class:fa-eye-slash={isPasswordHidden}
            class:fa-eye={!isPasswordHidden}
            ></i>
   </div>
</div>

<style>
    .input-icon {
        cursor: pointer;
        position: absolute;
        font-size: 1.1rem;
        top: 50%;
        right: 1rem;
        transform: translate(-50%, -50%);
        transition: all .4s ease;
    }
</style>