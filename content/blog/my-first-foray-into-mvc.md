---
title: My First Foray into MVC
description: Though I was intangibly acquainted with the Model-View-Controller pattern, I recently started using this incredible pattern to implement an application and found it to be a highly rewarding experience in future-proofing. MVC and multitier architecture are awesome tools to have in your belt, and well worth learning about.
published: 2024-02-01T02:37:50+0000
updated: 2024-02-01T03:03:45+0000
tags: ['Language: Rust', 'Development']
---

I recently started working on an application which I'd like to make available as
both a CLI and via a GUI. Before jumping in, I threw some questions at good ol' ChatGPT,
and it lead me to taking a closer look at [Model-View-Controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)
and [multitier architecture](https://en.wikipedia.org/wiki/Multitier_architecture).
I was vaguely familiar with these patterns but had not employed them from the ground
up before. They are pretty useful tools to have in yer belt, so I figured I'd share
a bit about what I learned, as well as some code examples of how to implement MVC
in Rust, with a little bit of dependency injection in the mix.

## MVC and Multitier in a Nutshell

### Models

In MVC, "models" represent all of the business logic of an application. Forget about
how a user is going to interact with the system, this is somewhat akin to the philosophical
Platonic ideal of the application. What does it actually do?

![Bobs from Office Space asking "What would you say you do here?"](../../static/images/blog/my-first-foray-into-mvc/what-would-you-say-you-do-here.gif)

### Views

Any surface the user will use to interact with the application is considered a "view."
This could be a web application, a mobile app, or even a CLI. (Hey, that's what I
was going on about at the beginning of this post!)

### Controllers

The controller is kinda like glue between the views and models. It decouples them
so that the view isn't responsible for knowing anything about the model implementations,
and similarly the model doesn't need to know about how to tell the view what to present.
They translate the user interactions from the view into actions that can be imposed
upon the models, and relay data back from the models to the view so the user can
see what's happening.

There's a bit more to it than that, but that's why I left a link to the Wikipedia
article up above.

### Multitier architecture

Multitier follows a similar approach to MVC, with slightly different nomenclature.
Basically there are layers to the application, including but not limited to: data,
application/logic, and user interface. Loosely speaking, data corresponds to models,
application/logic would be in controllers, and user interfaces are views. The interesting
part here, to me, is that you can create a \"data\" interface that the application
logic can interact with as a means of storing and retrieving information. This interface
could be implemented using file storage, a database, cloud storage, etc. In theory,
you can swap out the implementation of the data layer, and the application logic,
or controllers, can keep on trucking.

Similarly, if you wanted to have more than one user interface that can interact with
the application, you can provide them with the application logic/controllers, and
let them decide how to present state.

## Example Code

As a high level overview, here's the basic structure of the application:

```shell
src
├── app
│   └── mod.rs
├── common
│   └── mod.rs
├── data
│   ├── filesystem
│   │   └── mod.rs
│   └── mod.rs
├── interface
│   ├── cli
│   │   └── mod.rs
│   └── mod.rs
└── main.rs
```

- `app` is the meat n' taters, the application logic/models
- `common` is a place to put stuff that can be used by both the app and the data
  layer, e.g. structs representing data object shapes
- `data` is where the data layer stuff is put. In this example, the application implements
  a filesystem based data store, but later on the data store could be implemented
  using a database, and furthermore could be imported as an entirely separate crate
  to allow consumers to bring whatever data store they like
- The `interface` in this is a humble CLI, but later on there could be a desktop client,
  a web application, and more
- For now I'm keeping this all in one place, so `main.rs` just spins up an app that
  uses a filesystem based data store and provides the app as a CLI

```rust
/// src/data/mod.rs
// This provides the filesystem module to the outside world
pub mod filesystem;

// DataStore trait must be implemented by whatever data store is used
// In this example, all data stores must implement the get_stuff function
pub trait DataStore {
    fn get_stuff(&self) -> String;
}
```

```rust
/// src/data/filesystem/mod.rs
// We're going to implement the DataStore trait
use super::DataStore;

// This struct is an implementation of DataStore that uses the filesystem
pub struct FileSystemDataStore {}

impl FileSystemDataStore {
    pub fn new() -> Self {
        FileSystemDataStore {}
    }
}

// Here is where we implement the DataStore trait for the FileSystemDataStore
// This allows for the FileSystemDataStore to be used by the application as its data store
impl DataStore for FileSystemDataStore {
    fn get_stuff(&self) -> String {
        "I'm getting stuff from the file system".to_string()
    }
}
```

```rust
/// src/app/mod.rs
use crate::data::DataStore;

pub struct App<T: DataStore> {
    data_store: T,
}

impl<T: DataStore> App<T> {
    // Dependency injection of the data store allows for swapping out the data store implementation
    pub fn new(data_store: T) -> Self {
        App { data_store }
    }

    // This method will call the get_stuff method on the data store
    // The magic is that it doesn't care HOW the data is stored, just knows it can retrieve it
    pub fn get_stuff(&self) {
        self.data_store.get_stuff();
    }
}
```

```rust
/// src/interface/mod.rs
// exposes the cli module to the outside world
pub mod cli;
```

```rust
/// src/interface/cli/mod.rs
use crate::{app::App, data::DataStore};

// The Cli struct will be used to run the application from the command line
pub struct Cli<T: DataStore> {
    app: App<T>,
}

impl<T: DataStore> Cli<T> {
    pub fn new(app: App<T>) -> Self {
        Cli { app }
    }

    pub fn run(&self) -> Result<(), Box<dyn std::error::Error>> {
        self.app.get_stuff();

        Ok(())
    }
}
```

Finally, bringing it all together:

```rust
/// src/main.rs
mod app;
mod data;
mod interface;
use app::App;
use data::filesystem::FileSystemDataStore;
use interface::cli::Cli;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize an implementation of DataStore, in this case a FileSystemDataStore
    let filesystem = FileSystemDataStore::new();
    // Initialize an instance of App, using the filesystem data store
    let app = App::new(filesystem);
    // Initialize an instance of the user interface, in this case the Cli struct
    let cli = Cli::new(app);
    // Run the user interface, allowing it to interact with the underlying app
    cli.run()?;

    Ok(())
}
```

And there you have it, a simple demonstration of how the MVC pattern can be used
to decouple the concerns of an application so that you are more free to swap out
implementation details later, or even provide it in multiple different ways. Thanks
for reading my ramblings on this incredibly useful architecture. I for one am looking
forward to making use of in projects where it makes sense to.
