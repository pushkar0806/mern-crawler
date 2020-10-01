# Crawler- MEVN Stack
Crawls for the Top rated movies list and the implemented search functionality enables us to search for the movies as per various filters.

## Installation
Use the package manager [npm].

```bash
git clone https://github.com/pushkar0806/mern-crawler.git
```

### Install server dependencies
```bash
npm i
```
### Install client dependencies
#### cd into the client directory
```bash
npm i
```

---
## Usage

With concurrently installed, we will be executing the below command which will spin up both our servers.
```bash
npm run dev
```
---
Great, now the UI is running on:
```bash
http://localhost:8080/
```

---
## Technical Scopes
* The client internally would be pointing to the node server running on post 0801.
* With the click on **Crawl IMDB**, the movies list would be crawled down and served locally into a JSON file.
* The full list appears onto the UI with a search bar which will narrow down the list as per the applied inputs.
