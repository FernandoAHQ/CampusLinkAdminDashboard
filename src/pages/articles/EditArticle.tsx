import {
    Avatar,
    Button,
    Label,
    Modal,
    Select,
    Textarea,
    TextInput,
  } from "flowbite-react";
import { useEffect, useState } from "react";
import TagForm from "../../components/TagForm";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { HiSave, HiSaveAs } from "react-icons/hi";
import { useApi } from "../../hooks/useApi";
import { validateNewArticle } from "../../utils/validate";

  type UpdateArticleType = {
    title: string;
    content: string;
    tags: string[];
    image_url: string;
    active: boolean;
  };
  
  const initialState: UpdateArticleType = {
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
  
  
  function EditArticle() {
    const [searchParams] = useSearchParams();

    const [article, setArticle] = useState<UpdateArticleType>(initialState);
    const [newTag, setNewTag] = useState('');
    const {fetchArticle, postUpdateArticle} = useApi();

    const navigate = useNavigate();


    useEffect(() => {
        
        loadArticle();
      
    }, [])
    


    
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setArticle({...article, tags: [...article.tags, newTag]});
            setNewTag('');
        }
    };

    const loadArticle = async () => {
        const id = searchParams.get('id');
        const result = await fetchArticle(id!);
        if (Array.isArray(result) && result[0] === "success") {
            setArticle(result[1]);
            console.log(article);
            
          } else {
            console.error("Failed to fetch articles:", result);
          }
    };
    
    const submitArticle = async ()=> {
        const id = searchParams.get('id');
      const {valid, errors} = validateNewArticle(article);
      if (!valid) {
        return alert(errors);
      }
      const {title, content, tags, image_url, active} = article;
      const updatedData = {title, content, tags, image_url, active};

      const res = await postUpdateArticle(id!, updatedData);
      navigateHome();
      
    }

    const navigateHome = ()=>{
        navigate("/dashboard/articles");
    }
  
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

            <img src={article.image_url} alt="" />

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

            
            <div className="flex justify-end">
            <button onClick={navigateHome}
             type="button" className="font-Montserrat font-semibold text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:ring-gray-300  rounded-lg text-sm px-5 py-2.5 me-2 mb-8 flex">
            Cancel
          </button>
            
          <button type="button" onClick={submitArticle}
          className="font-Montserrat font-semibold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-sm px-5 py-2.5 me-2 mb-8 flex">
            <HiSaveAs size={20} className="text-white mr-1" /> 
            Save
          </button>
            </div>
            

  
          </form>

    );
  }

  
  export default EditArticle;
  