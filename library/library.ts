//1
enum ItemStatus{
    Available = "available",
    Borrowed = "borrowed",
    Lost = "lost"
}

interface LibraryItemData {
    id: number;
    title: string;
    year: number;
    status: ItemStatus;
    internalNote: string;
}

//2
type PublicItem = Omit<LibraryItemData, "internalNote">;
type ItemPreview = Pick<LibraryItemData, "id" | "title">;
type ItemUpdate = Partial<Omit<LibraryItemData, "id">>;

const publicItem: PublicItem = {
    id: 123,
    title: "Public item",
    year: 2020,
    status: ItemStatus.Available
};

const preview: ItemPreview = {
    id: 123,
    title: "Preview"
};

const update: ItemUpdate = {
    title: "New title",
};

//3
abstract class LibraryItem {
    protected title: string;
    protected year: number;
    #status: ItemStatus = ItemStatus.Available;
    constructor(title: string, year: number) {
        this.title = title;
        this.year = year;
    }
    get status(): ItemStatus {
        return this.#status;
    } 
    borrow(): void {
        if (this.#status === ItemStatus.Available){
            this.#status = ItemStatus.Borrowed
            console.log("Item was borrowed successfully");
        } else{
            console.log("Item currently not available");
        }

    }
    abstract describe(): string;
}

//4
class Book extends LibraryItem implements Searchable{
    author: string;
    constructor(title: string, year: number, author: string){
        super(title, year);
        this.author = author;

    }
    describe(): string {
        return `Книга: ${this.title} (${this.year}), автор ${this.author}`;
    }
    matches(query: string): boolean {
        const normalizedQuery = query.trim().toLocaleLowerCase()
        if (
            this.author.toLocaleLowerCase().includes(normalizedQuery) ||
            this.title.toLocaleLowerCase().includes(normalizedQuery)
        ){
            return true;
        }
        return false;
    }
}

class Magazine extends LibraryItem {
    issueNumber: number;
    constructor(title: string, year: number, issueNumber: number){
        super(title, year);
        this.issueNumber = issueNumber;

    }
    describe(): string {
        return `Журнал: ${this.title}, випуск №${this.issueNumber}`;
    }
}

// new LibraryItem("Cool book", 2026);
// Cannot create an instance of an abstract class.

//5
interface Searchable {
    matches(query: string): boolean;
}

//6
const kobzar: Book = new Book("Kobzar", 1840, "Taras Shevchenko");
const hobbit: Book = new Book("The Hobbit", 1840, "JRR Tolkien");
const sadivnyk: Magazine = new Magazine("Sadivnyk", 2005, 3);
const libraryItems: LibraryItem[] = [kobzar, hobbit, sadivnyk];

libraryItems.forEach((item: LibraryItem) => {
    console.log(item.describe())
});

