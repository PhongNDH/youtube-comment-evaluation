import pprint
import numpy as np
import pandas as pd

from sklearn import preprocessing, metrics

import torch
from torch import Tensor
from torch.utils.data import DataLoader
from torch.optim import AdamW
import torchtext
import torchtext.transforms as T
import torchtext.functional as F
from torchtext.models import RobertaClassificationHead, XLMR_BASE_ENCODER

import pickle

import nltk
from nltk.corpus import stopwords
from langdetect import detect
from vncorenlp import VnCoreNLP
from autocorrect import Speller
import json

address = 'D:\Django\sentiment\\'
rdrsegmenter = VnCoreNLP(address+"backend\\base\VnCoreNLP-master\\VnCoreNLP-master\\VnCoreNLP-1.1.1.jar", annotators="wseg,pos,ner", max_heap_size='-Xmx2g')

label_map = {
    0: 'negative',
    1: 'neutral',
    2: 'positive'
}


DEVICE = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
class PadTransform(torch.nn.Module):
    """Pad tensor to a fixed length with given padding value.
    :param max_length: Maximum length to pad to
    :type max_length: int
    :param pad_value: Value to pad the tensor with
    :type pad_value: bool
    """

    def __init__(self, max_length: int, pad_value: int) -> None:
        super().__init__()
        self.max_length = max_length
        self.pad_value = float(pad_value)
        
    def forward(self, x: Tensor) -> Tensor:
        """
        :param x: The tensor to pad
        :type x: Tensor
        :return: Tensor padded up to max_length with pad_value
        :rtype: Tensor
        """
        max_encoded_length = x.size(-1)
        if max_encoded_length < self.max_length:
            pad_amount = self.max_length - max_encoded_length
            x = torch.nn.functional.pad(x, (0, pad_amount), value=self.pad_value)
        return x

#preparemodel
def prepare_modelEng():
    num_classes = 3
    input_dim = 768

    classifier_head = RobertaClassificationHead(num_classes=num_classes, input_dim=input_dim)
    model = XLMR_BASE_ENCODER.get_model(head=classifier_head)
    
    DEMO_MODEL_PATH = address+'backend\\base\\model_max_accuracy.pth'
    model.load_state_dict(torch.load(DEMO_MODEL_PATH))
    model.to(DEVICE)
    
    print(f'Loaded model to [{DEVICE}] in [{DEMO_MODEL_PATH}]')
    return model
def prepare_modelVie():
    num_classes = 3
    input_dim = 768

    classifier_head = RobertaClassificationHead(num_classes=num_classes, input_dim=input_dim)
    model = XLMR_BASE_ENCODER.get_model(head=classifier_head)
    
    DEMO_MODEL_PATH = address+'backend\\base\\model_max_accuracy.pth'
    model.load_state_dict(torch.load(DEMO_MODEL_PATH))
    model.to(DEVICE)
    
    print(f'Loaded model to [{DEVICE}] in [{DEMO_MODEL_PATH}]')
    return model

def prepare_text_transform():
    text_transform = torchtext.models.XLMR_LARGE_ENCODER.transform()
    return text_transform
def predict(sentence, model, text_transform, label_map):
    transformed_text = text_transform(sentence)
    out = model(torch.tensor([transformed_text]).to(DEVICE))
    return label_map[torch.argmax(out).item()]

def eng_predict(text):
    #spellingcorrect
    spell = Speller(lang='en')
    text = spell(text)
    
    #stemming
    stemmer = nltk.stem.SnowballStemmer('english')
    text = stemmer.stem(text)
    
    # lemmatizing
    lemmatizer = nltk.stem.WordNetLemmatizer()
    text = lemmatizer.lemmatize(text)
    
    return predict(text, modelEng, text_transform, label_map)

def vie_predict(text):
    
    #spellingcorrect
    spell = Speller(lang='vi')
    text = spell(text)
    
    op = rdrsegmenter.tokenize(text)
    text = ' '.join([' '.join(x) for x in op])
    
    return predict(text, modelVie, text_transform, label_map)

modelEng = prepare_modelEng()
modelVie = prepare_modelVie()
text_transform = prepare_text_transform()

        
def release_prediction():
    df = pd.read_csv(address +'backend\\commentsytV2.csv')
    # lowercasing
    df['Comment'] = df['Comment'].str.lower()
    # removing urls
    df['Comment'] = df['Comment'].str.replace('http\S+|www.\S+', '', case=False)
    # removing commas "\n"
    df['Comment'] = df['Comment'].replace('\n','', regex=True)
    # removing all the punctuations
    df['Comment'] = df['Comment'].str.replace('[^\w\s]','')
    # return df['Comment']
    
    class Comment:
        def __init__(self, content, language, sentiment):
            self.content = content
            self.language = language
            self.sentiment = sentiment
            
   
    comments = []        
    

    for row in df['Comment']:
        try:
            lang = detect(row)
            if(detect(row) == 'vi'):
                comments.append(Comment(row,detect(row),vie_predict(row)))
            else:
                comments.append(Comment(row,detect(row),eng_predict(row)))
        except TypeError:
            comments.append(Comment(row,'unk','neutral'))
        except:
            lang = 'en'
            comments.append(Comment(row,lang,eng_predict(row)))
            
    # for row in df['Comment']:
    #     try:
    #         lang = detect(row)
    #         if(detect(row) == 'vi'):
    #             print(row, ' | ', detect(row), ' | ', vie_predict(row))
    #         else:
    #             print(row, ' | ', detect(row), ' | ', eng_predict(row))
    #     except TypeError:
    #         print(row, ' | ', 'unk', ' | ', 'neutral')
    #     except:
    #         lang = 'en'
    #         print(row, ' | ', lang, ' | ', eng_predict(row))
            
    # print("--------------------------")
    
    # for comment in comments:
    #     print(comment.content, ' | ', comment.language, ' | ', comment.sentiment)
            
    return comments
            
release_prediction()