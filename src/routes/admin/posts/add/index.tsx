import { component$, useStore, $, useSignal } from "@builder.io/qwik";

export default component$(() => {
  const formData = useStore({ name: "", url: "", teaser: "", content: "" });
  const formSubmitted = useSignal(false);

  const submitHandler = $(async () => {
    await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    formSubmitted.value = true;
  });

  return (
    <>
      {formSubmitted.value === false ? (
        <form preventdefault:submit onSubmit$={submitHandler}>
          <div>
            <input
              name="name"
              placeholder="Name"
              onInput$={(event) =>
                (formData.name = (event.target as HTMLInputElement).value)
              }
            />
          </div>
          <div>
            <input
              name="url"
              placeholder="Url"
              onInput$={(event) =>
                (formData.url = (event.target as HTMLInputElement).value)
              }
            />
          </div>
          <div>
            <textarea
              name="teaser"
              placeholder="Teaser"
              rows={4}
              onInput$={(event) =>
                (formData.teaser = (event.target as HTMLInputElement).value)
              }
            />
          </div>
          <div>
            <textarea
              name="content"
              placeholder="Inhalt"
              rows={10}
              onInput$={(event) =>
                (formData.content = (event.target as HTMLInputElement).value)
              }
            />
          </div>
          <button type="submit">Speichern</button>
        </form>
      ) : (
        <div>
          <p>Der Beitrag wurde erfolgreich angelegt.</p>
          <p>
            <a href="/">Startseite</a>
          </p>
        </div>
      )}
    </>
  );
});
