<script>

</script>

<form>
    <figure class="emblem">
        <img src="../assets/Logo.svg" alt="" />
    </figure>

    <div>
        <p class="label">Ссылка на сброс пароля отправлена на почту</p>
    </div>

    <div class="submit">
        <button class="btn__raised btn-primary" 
        on:click={(e) => {
            e.preventDefault();
        }}>
            На главную
        </button>
    </div>

</form>

<style>
    .label {
        display: flex;
        justify-content: center;

        font-weight: 400;
        font-size: 1.5rem;
        line-height: 47px;

        color: #262626;
    }

    .submit {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        margin-top: 40px;
    }
</style>