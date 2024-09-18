import  PostModel  from '../models/Post.js';

export const getLastTags = async (req, res) => {
  try{
      const posts = await PostModel.find().limit(5).exec(); 
      const tags = posts.map((obj) => obj.tags).flat().slice(0, 5); 

      res.json(tags);                       
  }catch(err) {
    console.log(err);
    res.status(500).json({
        message: 'Не удалось получить все теги / the articles doesn`t got',
  });
}};

export const getAll = async (req, res) => {
    try{
        const posts = await PostModel.find().populate('user').exec();   // нужно вернуть все статьи. Подключим связь с другой таблицей в базе данных   .populate('user')     и дадим команду на выполнение      .exec()
        res.json(posts);                        //укажи что надо вернуть массив статей
    }catch(err) {
      console.log(err);
      res.status(500).json({
          message: 'Не удалось получить все статьи / the articles doesn`t got',
    });
}};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const updatedDoc = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { new: true }
    ).populate('user');

    if (!updatedDoc) {
      return res.status(404).json({
        message: "Такая статья не найдена",
      });
    }

    res.json(updatedDoc);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статью',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    const doc = await PostModel.findOneAndDelete({ _id: postId });
    if (!doc) {
      res.status(404).json({
        message: "Такая статья не найдена",
      });
      return;
    };
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Нет доступа",
    });
  }
};

export const create = async (req, res) => {
    try {
      const doc = new PostModel({  //I point in the code that us must create new doc
        title: req.body.title,     //We point in the document that there is title 
        text: req.body.text,      //and text
        tags: req.body.tags.split(','),        //and tags
        imageUrl: req.body.imageUrl,//imageUrl
        user: req.userId,           //user does not need to receive a userId from a client. He will need receive a userId from the req.userId. here us get  the userId (the token) from checkAuth.js file at req.userId = decoded._id;
// body This is that we get from the user, but in addition to the information that the user needs to provide us, we have something that we need to send to the backend    
      });

      const post = await doc.save(); //now when the doc was prepared need save It
//And we return the response
      res.json(post);
    } catch (err) {
        console.log(err);

        res.status(500).json({
            massage: 'Не удалось сoздать статью / the article be didn`t make',
        });
    };
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    const doc = await PostModel.updateOne(
      { _id: postId },
      { $set: {
          title: req.body.title,
          text: req.body.text,
          tags: req.body.tags.split(','),
          imageUrl: req.body.imageUrl,
          user: req.userId,
        },
      }
    );
  res.json({
    success: true,
  });
  } catch (err) {
      console.log(err);
      res.status(500).json({
          massage: 'Не удалось сoздать ствтью / the article be didn`t make',
      });
  };
};
