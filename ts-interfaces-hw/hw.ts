interface Book {
    readonly id: number
    title: string
    author: Author
    year: number
    pages: number
    genre?: string
    rating?: number
}

interface Author {
    name: string
    country: string
}

function printBook(book: Book): void {
    console.log(`"${book.title}" — ${book.author.name}`);
    if(book.genre){
        console.log(book.genre);
    }
    if(book.rating !== undefined){
        console.log(book.rating);
    }
};

function getRecentBooks(books: Book[], afterYear: number): string[] {
    return books
        .filter(book => book.year > afterYear)
        .map(book => book.title);
}

const Kobzar: Book = {
    id: 1,
    title: "Kobzar",
    author: {
        name: "Taras Shevchenko",
        country: "Ukraine"
    },
    year: 1840,
    pages: 114,
};

const TheHobbit: Book = {
    id: 2,
    title: "The Hobbit",
    author: {
        name: "J.R.R. Tolkien",
        country: "United Kingdom"
    },
    year: 1937,
    pages: 310,
    rating: 4.3,
    genre: "Fantasy, Adventure",
};

const HarryPotter: Book = {
    id: 3,
    title: "Harry Potter and the Deathly Hallows",
    author: {
        name: "J.K. Rowling",
        country: "United Kingdom"
    },
    year: 2007,
    pages: 607,
    genre: "Fantasy",
    rating: 4.6
};

const TheHungerGames: Book = {
    id: 4,
    title: "The Hunger Games",
    author: {
        name: "Suzanne Collins",
        country: "United States"
    },
    year: 2008,
    pages: 374,
    genre: "Dystopian, Science Fiction",
    rating: 4.3
};

const library: Book[] = [Kobzar, TheHobbit, HarryPotter, TheHungerGames];

// Kobzar.id = 99;

printBook(Kobzar);
printBook(TheHobbit);

console.log(getRecentBooks(library, 2000));