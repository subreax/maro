<script>
    import { createEventDispatcher, onMount } from "svelte";
    
    export const STYLE_NONE = 0;
    export const STYLE_CORRECT = 1;
    export const STYLE_WRONG = 2;

    
    const dispatch = createEventDispatcher();

    export let digits = 4;
    export let style = STYLE_NONE;

    let component;
    let inputs;
    let currentInputIndex = 0;

    let enteredCode = [];
    $: {
        let isCodeEntered = true;
        for (let i = 0; i < digits; ++i) {
            if (enteredCode[i].length === 0) {
                isCodeEntered = false;
                break;
            }
        }

        if (isCodeEntered) {
            dispatch("code", { code: enteredCode.join("") })
        }
    }

    for (let i = 0; i < digits; ++i) {
        enteredCode.push("");
    }


    function isDigit(character) {
        const digit = character ? character.codePointAt(0) - 48 : -1;
        return digit >= 0 && digit <= 9;
    }

    function setCurrentInputIndex(i) {
        if (i < 0) {
            i = 0;
        } else if (i >= digits) {
            i = digits-1;
        }

        currentInputIndex = i;
    }

    function clamp(i, min, max) {
        if (i < min) {
            i = min;
        }
        else if (i > max) {
            i = max;
        }
        return i;
    }

    function clampInputIndex(i) {
        return clamp(i, 0, digits-1);
    }

    function setCarretToEnd(offset = 0) {
        const i = clampInputIndex(offset + currentInputIndex);
        inputs[i].setSelectionRange(2, 2);
    }

    function getInput(offset = 0) {
        const i = clampInputIndex(offset + currentInputIndex);
        return inputs[i];
    }

    function getCodeValue(offset = 0) {
        const i = clampInputIndex(offset + currentInputIndex);
        return enteredCode[i];
    }

    function setCodeValue(val, offset = 0) {
        const i = clampInputIndex(offset + currentInputIndex);
        enteredCode[i] = val;
    }

    function onInputEntered(event) {
        event.preventDefault();

        style = STYLE_NONE;

        const data = event.key;
        const charRemoved = event.inputType !== undefined && event.inputType.startsWith("deleteContent");

        if (!charRemoved) {
            if (isDigit(data)) {
                if (getCodeValue().length > 0) {
                    setCurrentInputIndex(currentInputIndex+1);
                }

                if (getCodeValue().length === 0) {
                    setCodeValue(data);
                }
            }
        }
        else {
            setCurrentInputIndex(currentInputIndex-1);
        }

        getInput().focus();
        setCarretToEnd();
    }

    function onInputClicked(event) {
        for (let i = 0; i < digits; ++i) {
            if (inputs[i] === event.target) {
                setCurrentInputIndex(i);
                break;
            }
        }

        if (getCodeValue().length === 0) {
            while (currentInputIndex > 0) {
                if (getCodeValue().length !== 0) {
                    break;
                }
                --currentInputIndex;
            }
        } 
        else {
            while (currentInputIndex < digits) {
                if (getCodeValue().length === 0) {
                    break;
                }
                ++currentInputIndex;
            }
            --currentInputIndex;
        }

        getInput().focus();
        setCarretToEnd();
    }

    onMount(() => {
        inputs = component.childNodes;
    });

</script>

<div bind:this={component} on:input={onInputEntered} on:click={onInputClicked}>
    {#each Array(digits) as _, i (i)}
        <input  class:correct={style===STYLE_CORRECT} 
                class:wrong={style===STYLE_WRONG} 
                type="text" 
                maxlength="2" 
                bind:value={enteredCode[i]} 
                on:keypress={onInputEntered}>
    {/each}
</div>

<style>
    input {
        box-sizing: border-box;
        font-size: inherit;
        background: #0000000e;
        width: 3em;
        line-height: 3em;
        padding: 0;
        margin: 8px;
        border: none;
        border-radius: 8px;
        text-align: center;
        outline: none;
    }

    input.correct {
        background: #00ff220e;
    }

    input.wrong {
        background: #ff00000e;
    }

</style>
