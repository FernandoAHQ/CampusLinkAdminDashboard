import {
    Avatar,
    Button,
    Label,
    Modal,
    Select,
    Textarea,
    TextInput,
  } from "flowbite-react";
import { useState } from "react";
import TagForm from "../../components/TagForm";

  type NewArticleType = {
    title: string;
    content: string;
    tags: String[];
    image_url: string;
    active: boolean;
  };
  
  const initialState: NewArticleType = {
      title: "",
      content: "",
      tags: [],
      image_url: "",
      active: false
  };

  const premadeTags = [
    "AI",
    "Astronomy",
    "Biotechnology",
    "Chemistry",
    "Coding",
    "Cybersecurity",
    "Data Science",
    "Engineering",
    "Genetics",
    "Machine Learning",
    "Mathematics",
    "Nanotechnology",
    "Neuroscience",
    "Physics",
    "Quantum Computing",
    "Renewable Energy",
    "Robotics",
    "Software Development",
    "Space Exploration",
    "STEM Education"
  ];
  
  
  function NewArticle() {

    const [article, setArticle] = useState<NewArticleType>(initialState);
    const [newTag, setNewTag] = useState('');
    
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setArticle({...article, tags: [...article.tags, newTag]});
            setNewTag('');
        }
    };
  
    return (

          <form className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Title" />
              </div>
              <TextInput
                id="title"
                placeholder="The Rise of Renewable Energy: Can We Go Fully Green?"
                required
                shadow
                value={article.title}
                onChange={(e) => {
                  setArticle({ ...article, title: e.target.value });
                }}
              />
            </div>
  

            <div>
              <div className="mb-2 block">
                <Label htmlFor="content" value="Content" />
              </div>
              <Textarea
                rows={20}
                id="content"
                placeholder="Add the content for the article..."
                required
                shadow
                value={article.content}
                onChange={(e) => {
                  setArticle({ ...article, content: e.target.value });
                }}
              />
            </div>

            <div className="flex">
                <div className="flex-1">
                <div>
                    <div className="mb-2 block ">
                        <Label htmlFor="tags-text" value="Tags" />
                    </div>
                    <div className="flex flex-row">
                        <TextInput
                        
                        className="w-full"
                        id="tags-text"
                        type="text"
                        placeholder=""
                        shadow
                        value={newTag}
                        onKeyDown={(e)=>{
                            handleKeyDown(e);
                        }}
                        onChange={(e) => {
                            setNewTag(e.target.value);
                        }}
                        />
                        <Select
                        className="w-full ml-1"
                        id="newTag"
                        required
                        value={newTag}
                        onChange={(e) => {
                            setArticle({...article, tags: [...article.tags, e.target.value]});
                        }}
                        >
                        {premadeTags.filter(t => t.toLowerCase().startsWith(newTag.toLowerCase()))
                        .map((tag) =><option value={tag} >{tag}</option>)}
                        </Select>
                    </div>
                </div>
                <div className="flex mt-2">
                    {article.tags.map((tag, index)=>{
                        return <TagForm label={tag} 
                        removeFunction={()=>{
                            const newTagsArray = article.tags;
                            newTagsArray.splice(index, 1);
                            setArticle({...article, tags: newTagsArray});
                        }}/>})
                    }
                </div>
                </div>

                <div className="flex-1 ml-2">
            <div className="mb-2">
                <Label htmlFor="image" value="Image URL" />
                </div>
              <TextInput
                id="image"
                type="text"
                placeholder="https://campuslink.com/picture.jpg"
                shadow
                value={article.image_url}
                onChange={(e) => {
                  setArticle({ ...article, image_url: e.target.value });
                }}
              />
            </div>
            </div>

            
            
            

  
          </form>

    );
  }

  
  export default NewArticle;
  